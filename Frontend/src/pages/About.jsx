

function About() {
  return (
    <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
      <div className="flex  justify-center">
        <img
          src="/images/about.jpg"
          alt="contact-image"
          className="w-full h-[90%] object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl font-bold "> <h1>About us</h1></div>

        <div>
          <p className="text-xl text-slate-700">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, omnis deleniti? Aliquid laborum a assumenda incidunt consequuntur placeat commodi quae corporis aut sapiente voluptate reprehenderit ipsum dignissimos molestiae, facere enim animi nesciunt perspiciatis expedita. Harum nihil cum nobis veritatis incidunt beatae recusandae accusantium voluptatibus ipsum, saepe pariatur fugit voluptates facere quas excepturi aliquid aperiam voluptatum? Eaque ex magni consequuntur explicabo tempore! Voluptate aspernatur quod beatae fuga voluptatem quae excepturi non iste ducimus praesentium? Natus aliquam, magni non laudantium saepe itaque deleniti illo! Possimus quisquam, dolore earum porro dolores molestiae quo ad non cupiditate necessitatibus nemo harum explicabo exercitationem eligendi. Numquam!</p>
        </div>
      </div>
    </div>
  )
}

export default About