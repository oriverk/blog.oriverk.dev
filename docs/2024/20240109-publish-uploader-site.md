---
title: ファイルをアップロード・ダウンロードできるWebアプリを公開しました
create: "2024-01-09"
update: "2024-01-09"
tags: [react, firebase]
description: "趣味領域で開発・メンテナンスしているJS製ツールを配布するために、React、Zod、Firebaseなどを使ってWebアプリを作成しました"
published: true
---

以降、UL＝アップロード、DL＝ダウンロードと省略します。

## はじめに

趣味関係で開発・メンテナンスしている JS 製のツールを GoogleDive で配布していたのですが、代替サービスを探していました。探す中で作れそうだ・作ってみたいと思い、2022年8月にサイトを公開しました。

※自ツール配布のためだけのサイトであり、また悪意のあるファイルを他者に UL されると困るので、サイト URL と GitHub リポジトリは非公開です。

### どんなサービス

`.zip`ファイルを説明文とともに UL し、また DL できるサービス。UL にはユーザー登録を必要とし、DL は非登録ユーザーでも可能。

![Image from Gyazo](https://i.gyazo.com/ca3fe099cecbd3ae3190071178432e52.png)

`.zip`ファイルの種別やサイズ、最終更新、ダウンロード数、説明文を閲覧できる。

![Image from Gyazo](https://i.gyazo.com/a196d0a42cc76e0bcdabbbb4658cde5a.png)

利用規約に同意すると、DL 可能となる。

![Image from Gyazo](https://i.gyazo.com/506ba3da5f5e4b8cd6ca54f49423205b.png)

### 利用状況

基本的に月上旬に1回、不具合などあればマイナーアップデート版と言った風にしています。※メンテナンス・開発を引き継ぐ前から、日時ベースのバージョン管理となっていました。

![Image from Gyazo](https://i.gyazo.com/ac6ea63d60e6b9ddb707f95bb9b1b9d8.png)

![Image from Gyazo](https://i.gyazo.com/f1e7e6c245d3f2cd161ec7157a855d41.png)

## 開発

### 利用した技術・サービス

サイトデザイン等は省力化のために[Tailwind CSS Components](https://tailwindcomponents.com/)を参照しました。

- React, TypeScript, TailwindCSS
  - [CSFrequency/react-firebase-hooks: React Hooks for Firebase.](https://github.com/CSFrequency/react-firebase-hooks)
  - [React Hook Form - Simple React forms validation](https://www.react-hook-form.com/)
    - [Zod | Documentation](https://zod.dev/)
    - [react-dropzone](https://react-dropzone.js.org/)
- [Firebase](https://firebase.google.com)
  - Hosting, Firestore Database, Storage

### Form components

`react-hook-form`を使い、`TextInput.tsx`, `PasswordInput.tsx`, `Textarea.tsx`, `Checkbox.tsx` などを作成し、signup や login 認証やファイル UL 時のフォームで利用しました。また、ファイル UL の為のドロップゾーンは`react-dropzone`を利用しましたが、コードが長いので割愛します。

<details>

<summary>PasswordInput.tsx</summary>

```typescript
import type { ComponentProps, FC } from "react";
import { useState, useCallback } from "react"
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export type InputProps = Omit<ComponentProps<"input">, "type"> & {
  id: string;
  label: string;
  validation?: RegisterOptions;
  helperText?: string;
};

export const PasswordInput: FC<InputProps> = (props) => {
  const { label, placeholder = "", helperText = "", id, disabled, readOnly, validation, ...rest } = props;

  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  let stateClass;
  if (readOnly || disabled) {
    stateClass = "bg-gray-100 focus:ring-0 cursor-not-allowed border-gray-300 focus:border-gray-300";
  } else if (errors[id]) {
    stateClass = "focus:ring-red-500 border-red-500 focus:border-red-500";
  } else {
    stateClass = "focus:ring-primary-500 border-gray-300 focus:border-primary-500";
  }
  const className = twMerge("block w-full rounded-md shadow-sm", stateClass);
  const isError = !!Object.entries(errors).length && !!errors[id]

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-normal text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          {...register(id, validation)} {...rest}
          type={showPassword ? "text" : "password"}
          name={id} id={id}
          readOnly={readOnly} disabled={disabled}
          className={className} placeholder={placeholder} aria-describedby={id}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            togglePassword();
          }}
          type="button"
          className="focus:ring-primary-500 absolute inset-y-0 right-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none focus:ring"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-600" />
          ) : (
            <EyeIcon className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-600" />
          )}
        </button>
      </div>
      <div className="mt-1">
        {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        {isError && <span className="text-sm text-red-500">{JSON.stringify(errors[id]?.message, null, 2)}</span>}
      </div>
    </div>
  );
};
```

</details>

### 認証機能

ユーザー登録を私のみに制限するために、メールアドレス・パスワードによる Firebase 認証を選択し、`.env`で設定されたメールアドレスのみ使えるようにしました。

- [JavaScript でパスワード ベースのアカウントを使用して Firebase 認証を行う](https://firebase.google.com/docs/auth/web/password-auth?hl=ja)

#### zod

バリデーションのために`react-hook-form`の`zodResolver`を利用しました。

- [react-hook-form/resolvers: 📋 Validation resolvers: Yup, Zod, AJV, Joi, Superstruct, Vest, class-validator, io-ts, typanion, Ajv, TypeBox, Valibot and nope.](https://github.com/react-hook-form/resolvers#zod)

```typescript
import * from z from "zod";

const emailSchema = z
  .string()
  .email({ message: 'メールアドレスの形式が正しくありません' });

const passwordSchema = z.string()

export const SignUpWithEmailAndPasswordSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})
```

#### Signup

<details>

<summary>Signup.tsx</summary>

```typescript
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "@/lib/firebase";
import { SignUpWithEmailAndPasswordSchema } from "@/lib/zod";
import { Input, PasswordInput, Button } from "@/components/Form";

const validEmail = import.meta.env.VITE_VALID_EMAIL_ADRESS;

const Signup: FC = () => {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const methods = useForm<z.infer<typeof SignUpWithEmailAndPasswordSchema>>({
    resolver: zodResolver(SignUpWithEmailAndPasswordSchema),
  });
  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;
    if (email !== validEmail) {
      setError("email", { type: "custom", message: "メールアドレスまたはパスワードが間違っています" });
      setError("password", { type: "custom", message: "メールアドレスまたはパスワードが間違っています" });
      return;
    }

    createUserWithEmailAndPassword(email, password);
  });

  useEffect(() => {
    if (user) navigate("/admin");
  }, [user]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="mx-auto max-w-lg rounded-lg border">
        <div className="flex flex-col gap-4 p-4 md:p-8">
          <Input id="email" label="Eメールアドレス" placeholder="example@example.com" validation={{ required: "required" }} />
          <PasswordInput id="password" label="パスワード" validation={{ required: "required" }} />
          <Button type="submit">サインアップ</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Signup;
```

</details>

### Firestore database

ファイル UL の際に追加情報として入力するファイルの説明文やサイズ、contentType などを保存する先として、Firestore を利用しました。本来であれば userID などを追加すべきかと思いましたが、登録可能ユーザーを私のみに制限しているので楽をしました。

```json
{
  "files": {
    "autoID": {
      "name": "hoge.zip",
      "description": "description",
      "downloaded": 133,
      "contentType": "application/x-zip-compressed",
      "path": "path-to-firebase-storage",
      "size": 579896,
      "createdAt": "serverTime",
      "updatedAt": "serverTime"
    }
  }
}
```

```plaintext
<!-- firestore.rules -->
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }

    match /files/{fileID} {
      allow get, list, update;
      allow create, delete: if isAuthenticated()
    }
  }
}
```

### Storage

UL された`.zip`ファイルを保存するために利用しました。

```plaintext
<!-- storage.rules -->
rules_version = '2';
service firebase.storage {
  function isAuthenticated() {
    return request.auth != null;
  }

  match /b/{bucket}/o {
    match /files/{fileID} {
      allow get;
      allow create, update, delete: if isAuthenticated()
    }
  }
}
```

#### CORS Error

Firebase Storage を利用する際にあたって、CORS の設定をしました。

> ブラウザで直接データをダウンロードするには、Cloud Storage バケットに対してクロスオリジン アクセス（CORS）を構成する必要があります。
> > ウェブで Cloud Storage を使用してファイルをダウンロードする

- [ウェブで Cloud Storage を使用してファイルをダウンロードする  |  Cloud Storage for Firebase](https://firebase.google.com/docs/storage/web/download-files?hl=ja#cors_configuration)
- [クロスオリジン リソース シェアリング（CORS）の構成](https://cloud.google.com/storage/docs/configuring-cors?hl=ja)
- [gsutil をインストールする  |  Cloud Storage  |  Google Cloud](https://cloud.google.com/storage/docs/gsutil_install?hl=ja)

```json:cors.json
[
  {
    "origin": [
      "https://example.com",
      "http://localhost:3000"
    ],
    "responseHeader": ["Content-Type"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

```sh
gsutil cors set path-to-cors-json-file gs://<bucket_name>...
gsutil cors get gs://<bucket_name>
```

## おわりに

当初はドメイン代程度の赤字でも良いと思っていました。現在では毎日の粗食1杯程度の広告収入由来の利益は出ており、運用コストを抑えることのできる Firebase に感謝したいです。
