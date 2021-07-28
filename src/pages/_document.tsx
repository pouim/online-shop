import { authCheckStatus } from '@store/actions';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
  } from 'next/document';
import { connect } from 'react-redux';
  import { ServerStyleSheet } from 'styled-components';

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   dispatch(authCheckStatus());
  //   if (token) {
  //     dispatch(loadAuthUser());
  //   }
  // }, [dispatch]);
  
 class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const sheet = new ServerStyleSheet();
      const originalRenderPage = ctx.renderPage;
      
      try {
        ctx.renderPage = () =>
          originalRenderPage({
            enhanceApp: (App) => (props: any) =>
              sheet.collectStyles(<App {...props} />),
          });

         
        const initialProps = await Document.getInitialProps(ctx);
        return {
          ...initialProps,
          styles: (
            <>
              {initialProps.styles}
              {sheet.getStyleElement()}
            </>
          ),
        };
      } finally {
        sheet.seal();
      }
    }
    render() {
      return (
        <Html lang="en">
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
            />
            <meta charSet="utf-8" />
            <link href="/fonts/style.css" rel="stylesheet" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }


  export default CustomDocument;
  