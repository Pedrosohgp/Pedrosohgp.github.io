class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # Método para obter o nome
    def get_name(self):
        return self.name

    # Método para definir o nome
    def set_name(self, new_name):
        self.name = new_name

    # Método para obter a idade
    def get_age(self):
        return self.age

    # Método para definir a idade
    def set_age(self, new_age):
        self.age = new_age

    # Método para apresentar a pessoa
    def introduce(self):
        print(f"Olá, meu nome é {self.name} e eu tenho {self.age} anos.")


# Exemplo de uso
if __name__ == "__main__":
    person1 = Person("Alice", 30)
    person1.introduce()  # Olá, meu nome é Alice e eu tenho 30 anos.

    person1.set_name("Bob")
    person1.set_age(25)
    person1.introduce()  # Olá, meu nome é Bob e eu tenho 25 anos.

    print(person1.get_name())  # Bob
    print(person1.get_age())   # 25
