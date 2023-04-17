import type { FC } from "react";
import type { GetServerSidePropsContext } from "next";
import { generateSitemapXml } from "@src/utils/sitemap";

const Page: FC = () => null
export default Page

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { res } = ctx
  
  const xml = generateSitemapXml();
  const age = 60 * 60 * 24 // 24時間

  res.statusCode = 200
  res.setHeader('Cache-Control', `s-maxage=${age}, stale-while-revalidate`)
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
}