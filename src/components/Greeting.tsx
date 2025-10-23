type GreetingProps = {
  name: string;
  age?: number;
};

export default function Greeting({ name, age }: GreetingProps) {
  return (
    <>
      <h2>
        Hola {name}
        {age ? `,tienes ${age} años ` : ''}
      </h2>
    </>
  );
}
