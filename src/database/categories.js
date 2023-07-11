import barbershopImg from '../images/barbershop.png'
import polishImg from '../images/polish.jpeg'
import restaurantsImg from '../images/restaurants.jpeg'
import renovationsImg from '../images/renovations.jpeg'
import personalTrainersImg from '../images/personal-trainer.jpeg'
import privateTeachersImg from '../images/private-teachers.jpeg'

const categories = [
    {
        "id": 1,
        "name": "Barbershop",
        "route": "/barbershop",
        "image": barbershopImg
    },
    {
        "id": 2,
        "name": "Nail Polish",
        "route": "/nail polish",
        "image": polishImg
    },
    {
        "id": 3,
        "name": "Restaurants",
        "route": "/restaurants",
        "image": restaurantsImg
    },
    {
        "id": 4,
        "name": "Professionals",
        "route": "/professionals",
        "image": renovationsImg
    },
    {
        "id": 5,
        "name": "Personal Trainers",
        "route": "/personal trainers",
        "image": personalTrainersImg
    },
    {
        "id": 6,
        "name": "Private Teachers",
        "route": "/private teachers",
        "image": privateTeachersImg
    },
]

export default categories;