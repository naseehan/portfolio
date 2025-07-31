import event from "../assets/event.png";
import car from "../assets/car.png";
import movie from "../assets/movie.png";
import project from "../assets/project.png";
import room from "../assets/room.png";
import sports from "../assets/sports.png";

const ProjectDetails = [
  {
    id: 1,
    openName: "sports",
    name: "Signature Sports",
    description:
      "An e-commerce web application designed for a modern sports retail store. The platform allows users to browse, search, and purchase a wide range of sports equipment and apparel. Built with a clean and responsive design, it ensures a seamless shopping experience across all devices.",
    img: sports,
    link: "https://signature-sports.onrender.com/",
  },
  {
    id: 2,
    openName: "room",
    name: "Paradise Hotel",
    description:
      "Simplify room management with my intuitive room booking system, tailored to meet the needs of any facility. Administrators can effortlessly view room availability by selecting specific dates, ensuring that occupied rooms cannot be double-booked. Our system also provides the flexibility to update room statuses, whether making them available for booking or marking them as closed for maintenance. In addition, bookings can be easily canceled, with the room's status automatically updated to reflect the change. This tool is designed to streamline the booking process, making room management more efficient and error-free.",
    img: room,
    link: "https://reservation-system-dun.vercel.app/",
  },
  {
    id: 3,
    openName: "event",
    name: "Noble Events",
    description:
      "Introducing my cutting-edge event booking app revolutionizing how you plan and attend events. Designed with simplicity and efficiency in mind, our app offers seamless experience for both organizers and attendees alike. Whether you're hosting a conference, concert, or community gathering, our platform empowers you to effortlessly browse, compare, and book events from a diverse range of categories.",
    img: event,
    link: "https://noble-events.onrender.com/",
  },
  {
    id: 4,
    openName: "project",
    name: "Project management tool",
    description:
      "Elevate your team's productivity with my advanced project management tool, designed to streamline collaboration and task management. Our platform offers a user-friendly interface for managing projects from start to finish. Key features include secure login and signup, allowing team members to access their workspace with ease. Create, edit, and delete tasks and projects effortlessly, and assign team members to specific projects to ensure everyone is on the same page. Whether you're managing a small team or a large organization, our tool provides the flexibility and control you need to keep your projects on track and your team aligned.",
    img: project,
    link: "https://project-management-client-blush.vercel.app/",
  },
  {
    id: 5,
    openName: "car",
    name: "Car Rental",
    description:
      "Introducing my latest car rental app, designed to make your next car rental experience easy, affordable, and convenient. Whether you're traveling for business or pleasure, our app allows you to quickly search, compare and book rental cars from a wide range of trusted rental car companies.",
    img: car,
    link: "https://car-rental-new.vercel.app/",
  },
  {
    id: 6,
    openName: "movie",
    name: "Movie",
    description:
      "Introducing my new movie app, designed to help you discover your next favorite movie. Our app provides you with access to a vast selection of movies, all available to browse and search by name or category.",
    img: movie,
    link: "https://naseehan.github.io/movieland/",
  }
];

export default ProjectDetails;
