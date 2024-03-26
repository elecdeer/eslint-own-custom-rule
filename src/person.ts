type Person = { name: string; age: number };
type PersonAge = Pick<Person, "age">; // ok
type PersonName = Omit<Person, "age">; // error
const Omit = () => {
  console.log("Omitをomitしたい");
}; // ok
