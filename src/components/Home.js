
import { useModal } from "../hooks/useModal"
import { ModalAdd } from "../modals/ModalAdd";


export function Home() {

  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  /* const {user, logout, loading} = useAuth()
  //const authContext = useContext(context)

  console.log(user)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.erorr(error)
    }
  }

  if(loading) return<h1>loading</h1>
  */

  return (
    <div className="w-full max-w-3xl m-auto relative h-35">
      <div className="bg-white rounded-md py-4 pr-4 pl-8 shadow-md
      font-bold w-full absolute bottom-20 h-20">



        <button className=" float-right border border-green-700
        text-center py-2 px-4 rounded-xl text-white font-bold
        bg-green-600 hover:bg-green-700"
          onClick={openModal1}>
          Add worker</button>


      </div>
      <ModalAdd isOpen={isOpenModal1} closeModal={closeModal1}>
      <div className="sm:flex sm:items-start">
        
      </div>
      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"></div>
        <div className="mt-2">
          <div className=" text-center  xl:ml-4 sm:text-left  pr-8">
            <label>Full name</label>
            <input type="text"
              name="fullname"
              id="fullname"
              placeholder="write your full name"
              className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
            <label>Date born</label>
            <input type="date"
              name="dateborn"
              id="dateborn"
              className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
            <label>Age</label>
            <input type="int"
              name="age"
              id="age"
              placeholder="write your age"
              className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
            <label>DirectionHome</label>
            <input type="text"
              name="directionhome"
              id="directionhome"
              placeholder="write your direction your home"
              className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
            <label>Cell phone Number</label>
            <input type="int"
              name="cellphone"
              id="cellphone"
              placeholder="999 666 555"
              className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
            <label>Date of admission</label>
            <input type="date"
              name="dateadmission"
              id="dateadmission"
              className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
            <label>Position</label>
            <input type="text"
              name="position"
              id="position"
              placeholder="write your full name"
              className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
          </div>
        </div>

      </ModalAdd>

    </div>



  )
}
