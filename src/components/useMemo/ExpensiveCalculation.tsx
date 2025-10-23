import { useMemo, useState } from 'react';

/* useMemo memoriza el resultado de una función costosa o repetitiva.
Solo recalcula el valor cuando cambian las dependencias (en este caso, count).

Si no se usara useMemo, cada vez que el componente se renderizara (por ejemplo, al cambiar other), se volvería a ejecutar el cálculo aunque no fuera necesario.

El cálculo pesado (heavyCalculation) solo se ejecuta cuando cambia count.
Si presionas Cambiar other, el componente se renderiza, pero el cálculo no se repite
*/

function heavyCalculation(num: number) {
  console.log('Ejecutando cálculo pesado...');
  // Simulación de un cálculo muy costoso
  let total = 0;
  for (let i = 0; i < 1e8; i++) {
    total += i;
  }
  return total + num;
}

export default function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);
  const result = useMemo(() => {
    console.log('Calculando');
    return heavyCalculation(count);
  }, [count]);

  return (
    <>
      <p>Resultado: {result}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setOther(other + 1)}>Cambiar other</button>
    </>
  );
}
