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
    return `No existe en n = ${n}`;
  }
}

function obtenerPuntos() {
    
  var Canvas = document.getElementById("canvas");

  if (Canvas.getContext) {
    let context = Canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    let inicio = true;

    for (let i = -5; i < 5; i++) {

      //403 el punto medio del plano.
      //+5 * 80 porque cada unidad del plano tiene 80pxl.

      if (inicio) {
        context.moveTo(1, (403 - obtenerA_N(i)  * 80));
        inicio = false;
      } else {
        context.lineTo((i + 5)  * 80, (403 - obtenerA_N(i)  * 80));
      }

      console.log(i, obtenerA_N(i));
    }

    context.stroke();
  }
}

