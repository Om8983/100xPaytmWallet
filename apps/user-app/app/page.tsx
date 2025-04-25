import { RootState } from "@reduxjs/toolkit/query";
import { prisma } from "@repo/db"
import { setUserEmail } from "@repo/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";



const ThemeImage = async () => {
  console.log(process.env.DATABASE_URL)
  const user = await prisma.user.create({
    data: {
      email: "om@gmail.com",
      password: "12334242423"
    }
  })

  // const userDetsails = useSelector((state : any) => state.user)

  // const dispatch = useDispatch();
  // const handleEmailChange = () => {
  //   dispatch(setUserEmail({email : "om" , password : "123"}))
  // }


  return (
    <>
      home
      {/* <button onClick={handleEmailChange}>Click to change email and password </button> */}
    </>
  );
};

export default ThemeImage;