var A, B, C, R1, R2, SIGNO, ALFA, BETA, A_0, A_1;

function resolver() {
  SIGNO = document.getElementById("var-sign").value;
  A_0 = getNumericInput("a_0");
  A_1 = getNumericInput("a_1");

  //Obtener coeficientes, si están vacíos, asignar 1.
  //Los signos cambian al reordenar la ecuación e igualarla a 0.
  A = getNumericInput("var-a") || 1;
  B = -(getNumericInput("var-b") || 1);
  C = -parseInt(SIGNO + getNumericInput("var-c") || 1);

  obtenerRaices();
}

function getNumericInput(id) {
  return parseInt(document.getElementById(id).value);
}

function obtenerRaices() {
  //( -b    +      raíz de B^2           - 4A*C         ) / (2 * A)
  R1 = (-B + Math.sqrt(Math.pow(B, 2) - 4 * (A * C))) / (2 * A);
  R2 = (-B - Math.sqrt(Math.pow(B, 2) - 4 * (A * C))) / (2 * A);

  document.getElementById("r1").textContent = R1;
  document.getElementById("r2").textContent = R2;

  obtenerAlfa();
  obtenerPuntos();
}

function obtenerAlfa() {
  ALFA = A_0 - obtenerBeta();
}

function obtenerBeta() {
  BETA = -(-R1 + A_0);
  return BETA;
}

function obtenerA_N(n) {
  try {
    if (ALFA !== BETA) {
      return ALFA * Math.pow(R1, n) + BETA * Math.pow(R2, n);
    } else {
      return ALFA * Math.pow(R1, n) + n * (BETA * Math.pow(R2, n));
    }
  } catch {
    return 0; //No existe;;
  }
}

function obtenerPuntos() {
    
  var Canvas = document.getElementById("canvas");

  if (Canvas.getContext) {
    let context = Canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    let inicio = true;
    document.getElementById("body-valores").innerHTML = '';

    for (let i = -5; i < 5; i++) {

      //403 el punto medio del plano.
      //+5 * 80 porque cada unidad del plano tiene 80pxl.

      const a_n = obtenerA_N(i);

      if (inicio) {
        context.moveTo(1, (403 - a_n  * 80));
        inicio = false;
      } else {
        context.lineTo((i + 5)  * 80, (403 - a_n  * 80));
      }

      document.getElementById("body-valores").innerHTML += `
        <tr>
          <td>
            ${i}
          </td>
          <td>
            ${a_n}
          </td>
        <tr/>`
    }

    context.stroke();
  }
}

