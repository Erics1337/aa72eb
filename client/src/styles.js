export const styles = {
    container: {
      height: "100vh",
    },
      welcomeScreenImage: {
        /* bg-img */
        backgroundImage: 'url(bg-img.png)',
        backgroundSize: 'cover',
      },
      welcomeScreen: {
        background: 'linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%) ',
        opacity: 0.85,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
      },
      welcomeScreenContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '0 2px 10px rgba(0,0,0,0.2)',
      },
      icon: {
        color: 'white',
        fontSize: 50,
        display: 'block',
      },
      text: {
        textAlign: 'center',
        padding: '3rem',
      },
      input: {
        appearance: "none",
        background: "transparent",
        border: "none",
        borderBottom: "1px solid #fff",
        borderRadius: 0,
        color: "#fff",
        fontSize: "1.5rem",
        fontWeight: "bold",
        height: "3rem",
        marginBottom: "1rem",
        outline: "none",
        width: "100%",
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      },
  
      formRow: {
        justifyContent: 'flex-end', paddingTop: 10, paddingRight: 10
      },
      button: {
        marginLeft: 10,
      }
  }