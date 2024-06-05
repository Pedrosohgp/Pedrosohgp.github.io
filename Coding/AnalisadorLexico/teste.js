class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // Método para obter o nome
    getName() {
        return this.name;
    }

    // Método para definir o nome
    setName(newName) {
        this.name = newName;
    }

    // Método para obter a idade
    getAge() {
        return this.age;
    }

    // Método para definir a idade
    setAge(newAge) {
        this.age = newAge;
    }

    // Método para apresentar a pessoa
    introduce() {
        console.log(`Olá, meu nome é ${this.name} e eu tenho ${this.age} anos.`);
    }
}

// Exemplo de uso
const person1 = new Person('Alice', 30);
person1.introduce(); // Olá, meu nome é Alice e eu tenho 30 anos.

person1.setName('Bob');
person1.setAge(25);
person1.introduce(); // Olá, meu nome é Bob e eu tenho 25 anos.

console.log(person1.getName()); // Bob
console.log(person1.getAge());  // 25
