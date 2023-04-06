const year = new Date().getFullYear()
const nextjs = 'https://nextjs.org/'
const vercel = 'https://vercel.com/'

export const Footer: React.FC = () => (
  <footer className="flex flex-col items-center justify-center p-4">
    <div className="mx-0 my-auto text-center text-gray-400">
      <small className="text-sm">@{year} Kawano Yudai.</small>
      <br />
      <p className="mx-0 mb-0 mt-2">
        This site is built with&nbsp;
        <a href={nextjs} target="_blank" rel="noopener noreferrer">
          Next.js@13
        </a>
        &nbsp;and hosting on&nbsp;
        <a href={vercel} target="_blank" rel="noopener noreferrer">
          Vercel
        </a>
        .
      </p>
    </div>
  </footer>
)
