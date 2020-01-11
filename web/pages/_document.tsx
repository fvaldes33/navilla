import Document, { Html, Head, Main, NextScript } from 'next/document';
import { renderToString } from '@navilla/react/hydrate';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    // const originalRenderPage = ctx.renderPage
    const initialProps = await Document.getInitialProps(ctx);
    const { html } = initialProps;
    const results = await renderToString(html, {
      prettyHtml: true,
      removeScripts: true
    });
    console.log(results);
    return {
      ...initialProps,
      html: results.html
    }
  }
}

export default MyDocument;
