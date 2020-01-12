import Document from 'next/document';
import { renderToString } from '@navilla/react/hydrate';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    // const originalRenderPage = ctx.renderPage
    const initialProps = await Document.getInitialProps(ctx);
    const { html, styles: initialStyles } = initialProps;
    const results = await renderToString(html, {
      prettyHtml: false,
      removeScripts: true,
    });
    const stylesRegex = /(?<=(<style.+>))(.|\n)*?(?=(<\/style>))/;
    const bodyRegex = /(?<=(<body>))(.|\n)*?(?=(<\/body>))/;
    const { 0: styles } = results.html.match(stylesRegex);
    const { 0: body } = results.html.match(bodyRegex);

    return {
      ...initialProps,
      html: body,
      styles: (
        <>
          {initialStyles}
          <style dangerouslySetInnerHTML={{ __html: styles }} />
        </>
      ),
    }
  }
}

export default MyDocument;
