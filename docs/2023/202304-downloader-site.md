---
title: Reactで趣味ツールを配布するためのサイトを作りました（1年前に）
create: "2023-04-11"
update: "2023-04-11"
tags: [react, firebase]
description: ""
published: true
noindex: true
---

## はじめに

自作ツールの配布を行なうためのダウンローダサイトを React と Firebase を用いて作りました。元々利用していた GoogleDrive では個人的に不都合な点があり、他の手段を探していましたが、他ダウンローダサイトを見ていくうちに作れそうだと思い作りました。

※趣味領域に自分の個人情報が紐づけられたり、悪意のあるファイルをサイトに仕込まれるのを避けるため、GitHub レポジトリは Private 下にあります。またサイトが特定される様な情報は今投稿においては公開しません。

また以降はアップロードを UL、ダウンロードを DL と書きます。

[![Image from Gyazo](https://i.gyazo.com/de77e6c6106cc9516779b12c7f7a07bc.png)](https://gyazo.com/de77e6c6106cc9516779b12c7f7a07bc)

## サイトについて

### 機能要件

- アカウント登録・ログインができる
  - ※悪意のあるファイルが UL されるのを防ぐため、自分しか登録・ログインできない様に。
- ログイン時のみ、`.zip`ファイルをアップロードできる
- 登録・ログイン無しでファイルをダウンロードできる

### 使用したもの

- React, Typescript
  - [CSFrequency/react-firebase-hooks: React Hooks for Firebase.](https://github.com/CSFrequency/react-firebase-hooks)
  - [React Hook Form - Simple React forms validation](https://www.react-hook-form.com/)
  - [Zod | Documentation](https://zod.dev/)
- Firebase
  - Hosting, Firestore, Storage

### まとめ

以降はコードが多いので最初にまとめ。

firestore, storage を使った公開サイトははじめてでしたが、そこそこ使われている様で嬉しく、また楽しかったです（※下画像中の2023年2月13日ものがメジャーアップデート）。ニッチな領域のツールなので、これ以上の DL 数は望めませんが、元々自分が楽する様に作ったツールが DL されて使われるのは気持ちが良いものです。

コードを見返すと、ロジックとビューがごちゃ混ぜになっていて汚い箇所があるので修正していきたいです。

[![Image from Gyazo](https://i.gyazo.com/e3734f3d07305a65abba0316af82a1ae.png "一覧ページ")](https://gyazo.com/e3734f3d07305a65abba0316af82a1ae)

[![Image from Gyazo](https://i.gyazo.com/ac9e2d60a24f2b2a15b5af33cdd1d268.png "詳細ページ")](https://gyazo.com/ac9e2d60a24f2b2a15b5af33cdd1d268)

## 作成

### firebase

プロジェクトはまず firebase init で作りました。`.zip`の UL 先に FirebaseStorage、そのファイルの内容・DL 数のデータ情報・論理削除フラグなどのデータ保存先に Firestore を利用しました。

```shell
firebase init
```

```txt:filrebase.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }

    // function isUserAuthenticated(userID) {
    //   return request.auth.uid == userID;
    // }

   match /files/{fileID} {
     allow get, list, update;
      allow create, delete: if isAuthenticated()
    }
  }
}
```

```txt:storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /files/{fileID} {
      allow get;
      allow create, update, delete: if isAuthenticated()
    }
  }
}
```

通常であれば、`match /files/{user's UUID}/{fileID}`の様にするのが良かったのかもしれませんが、垢登録・UL を自分だけに制限するつもりでしたので、さぼりました。

また、storage へのアクセスで cors エラーが発生するので、ドキュメントを参照して対応しました。

- [クロスオリジン リソース シェアリング（CORS）の構成](https://cloud.google.com/storage/docs/configuring-cors?hl=ja)

```json:cors.json
[
  {
    "origin": ["http://origin1.example.com"],
    "responseHeader": ["Content-Type"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

```shell
gsutil cors set path-to-cors-json-file gs://<bucket_name>...
gsutil cors get gs://<bucket_name>
```

### react app

#### firebase setting

firebase v9 を使用しました。

- [認証状態の永続性  |  Firebase](https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=ja)

```typescript:filebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, browserSessionPersistence, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_KEY,
  authDomain: ., projectId: ., storageBucket: ., appId: .,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

const persisit = import.meta.env.VITE_FIREBASE_AUTH_PERSISIT;

if (persisit) {
  // ログインを継続しない
  getAuth().setPersistence(browserSessionPersistence);
}

export { auth, provider, db, storage };
```

#### file input form

フォームへの`.zip`ファイルや各種データの入力等に`react-hook-form`と`zod`を、ファイルインプット領域には`react-dropzone`を利用しました。

```jsx:newFile.ts
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateFormSchema } from "@/lib/zod";

const NewFile: FC = () => {
  const methods = useForm<Pick<FormData, "name" | "description" | "file" | "deleted">>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      name: "",
      file: [],
      description: Description,
      deleted: false,
    },
  });
  
  const onSumit = (async (data) => {
    // ...
  })
  
  return (
    <FormProvider {...methods}>
      <DropzoneInput
        id="file"
        label="file"
        accept={{
          "application/zip": [".zip"],
        }}
      />
      // ...
    </FormProvider>
  )
} 
```

[![Image from Gyazo](https://i.gyazo.com/26406cdc56c6c2cb42c49530923257b4.png "file input")](https://gyazo.com/26406cdc56c6c2cb42c49530923257b4)

#### login form

自分だけが登録できるようにするためパスワード認証を利用し、`.env`に登録された Email 以外は弾くようにしました。signup 認証は殆ど同じなので割愛します。

- [JavaScript でパスワード ベースのアカウントを使用して Firebase 認証を行う](https://firebase.google.com/docs/auth/web/password-auth?hl=ja)

```jsx:login.tsx
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/lib/firebase";
import { SignInWithEmailAndPasswordSchema } from "@/lib/zod";

const validEmail = import.meta.env.VITE_VALID_EMAIL_ADRESS;

const Login: FC = () => {
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const methos = useForm<{ email: string; password: string }>({
    resolver: zodResolver(SignInWithEmailAndPasswordSchema),
  });
  const { handleSubmit, setError } = methos;

  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;
    if (email !== validEmail) {
      setError("email", { type: "custom", message: "メールアドレスまたはパスワードが間違っています" });
      setError("password", { type: "custom", message: "メールアドレスまたはパスワードが間違っています" });
    } else {
      signInWithEmailAndPassword(email, password);
    }
  });
  
  return (
    <FormProvider {...methos}>
      <form onSubmit={onSubmit} className="mx-auto max-w-lg rounded-lg border">
        <div className="flex flex-col gap-4 p-4 md:p-8">
          <Input id="email" label="Eメール" placeholder="example@example.com" validation={{ required: "required" }} />
          <PasswordInput id="password" label="パスワード" validation={{ required: "required" }} />
          <Button type="submit">ログイン</Button>
        </div>
      </form>
    </FormProvider>)
}
```

[![Image from Gyazo](https://i.gyazo.com/538eb41a4bd118477b85f3ffca758baa.png)](https://gyazo.com/538eb41a4bd118477b85f3ffca758baa)

#### required auth

ログイン・非ログインでアクセスできるまたは表示するページを出しわけるためのコンポーネントを作り利用しました。

```jsx:RequiredAuth.tsx
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

const RequiredAuth: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <div>loading...</div>
  }

  if (!loading && error) {
    return <div>error...</div>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Seo noindex />
      <Outlet />
    </>
  );
};
```

admin ページは自分以外はアクセスしないので、パフォーマンスのためにも lazy import しました。

```jsx:App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
const RequiredAuth = lazy(() => import("./components/RequiedAuth"))
const Admin = lazy(() => import("./pages/admin"));
const NewFile = lazy(() => import("./pages/admin/new"));
const EditFile = lazy(() => import("./pages/admin/editFile"));
const DeleteFile = lazy(() => import("./pages/admin/deleteFile"));

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="files" element={<FileLayout />}>
          <Route index element={<Files />} />
          <Route path=":fileId">
            <Route index element={<FileDetail />} />
            <Route path="download" element={<FileDownload />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="admin" element={<RequiredAuth />}>
          <Route index element={<Admin />} />
          <Route path="new" element={<NewFile />} />
          <Route path="files/:fileId">
            <Route path="edit" element={<EditFile />} />
            <Route path="delete" element={<DeleteFile />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
```

## さいごに

アナリティクスによると MAU2000 弱の様です。値としては小さいですが、ニッチな領域でのツールの為のサイトなのでこんなものかと思います。
