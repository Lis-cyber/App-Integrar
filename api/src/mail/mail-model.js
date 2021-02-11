const firstTimePassword = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
    font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
    sans-serif;
    padding: 2rem;
    background: #e8e8e8;
    font-size: 14px;"
  >
    <div
      style="
        margin: 20px auto;
        width: 60vw;
        padding: 2rem;
        border-radius: 5px;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
        background: white;
      "
    >
      <h1>integrAR</h1>
      <p>Hola %name%, bienvenido a integrAR!</p>
      <p>
        Por favor confirma tu cuenta copiando el siguiente código en la app!
      </p>
      <p style="font-size: 24px;">%password%</p>
      <p>(Si consideras que fue un error por favor ignora este email).</p>
    </div>
  </body>
  </html>
`;

module.exports = {
  firstTimePassword,
};
