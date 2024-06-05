public class Person {
    private String name;
    private int age;

    // Construtor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Método para obter o nome
    public String getName() {
        return name;
    }

    // Método para definir o nome
    public void setName(String newName) {
        this.name = newName;
    }

    // Método para obter a idade
    public int getAge() {
        return age;
    }

    // Método para definir a idade
    public void setAge(int newAge) {
        this.age = newAge;
    }

    // Método para apresentar a pessoa
    public void introduce() {
        System.out.println("Olá, meu nome é " + name + " e eu tenho " + age + " anos.");
    }

    // Método principal para executar o exemplo
    public static void main(String[] args) {
        Person person1 = new Person("Alice", 30);
        person1.introduce();  // Olá, meu nome é Alice e eu tenho 30 anos.

        person1.setName("Bob");
        person1.setAge(25);
        person1.introduce();  // Olá, meu nome é Bob e eu tenho 25 anos.

        System.out.println(person1.getName());  // Bob
        System.out.println(person1.getAge());   // 25
    }
}
