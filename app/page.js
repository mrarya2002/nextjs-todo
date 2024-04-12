"use client"
import { useState ,useEffect} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from './firebase/config';
import { useRouter } from 'next/navigation';
import { doc, getDocs,collection,Timestamp,addDoc,updateDoc,deleteDoc,query,where } from 'firebase/firestore';

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');
  const [todos,setTodos] = useState([])
  const [newTask, setNewTask] = useState('');
  const [modal,setModal] = useState(false)
  const [updatedTodoTask,setUpdatedTodoTask] = useState("")
  const [todoId,setTodoId] = useState("")


  const todoCollectionRef = collection(db,"todos")

  if (!user && !userSession) {
    router.push('/signup');
  }


  console.log(user,userSession)
  const getTodos = async () => {
    try {
      const q = query(todoCollectionRef, where('userId', '==',user?.uid));
      const querySnapshot = await getDocs(q);

    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
      setTodos(filteredData);
      console.log(filteredData)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(user?.uid){
      getTodos();
    }
  }, [user]);

  const onSubmitTodo = async () => {
    try {
      await addDoc(todoCollectionRef, {
        todo:newTask,
        timestamp:Timestamp.fromDate(new Date("December 10, 1815")),
        userId: user?.uid,
      });
      setNewTask("")
      getTodos()
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    // console.log(id)
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    getTodos()
  };

  const updateTodo = async (id) => {
    setModal(prev=>!prev)
    setTodoId(id)
  };

  const updateTodoTask = async ()=>{
    const todoDoc = doc(db, "todos", todoId);
    await updateDoc(todoDoc, { todo: updatedTodoTask });
    setModal(prev=>!prev)
    setTodoId("")
    getTodos()
  }


  return (
    <main className="min-h-screen pt-20">
      <div className="flex w-full p-10 justify-center items-center">
      <div className="w-96 flex ">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="text-md font-md p-2 w-full border"
          type="text"
          placeholder="write your task.."
        />
        <button onClick={onSubmitTodo} className="text-lg font-bold text-white bg-indigo-600 px-6">
          Add
        </button>
      </div>
      </div>
      {modal && 
    <div className="w-full h-full absolute top-0 left-0 bg-black/30 flex justify-center items-center">
    <div className="up-card w-96 p-5 bg-white">
            <p className='text-sm font-bold text-right cursor-pointer' onClick={()=>setModal(prev=>!prev)}>close</p>
            <input onChange={(e)=>setUpdatedTodoTask(e.target.value)} type="text" className='text-md font-md p-2 w-full border' placeholder='enter task here..' />
            <button onClick={updateTodoTask} className='text-md text-white bg-indigo-500 py-2 w-full mt-2'>Update</button>
        </div>
    </div>
        }

      {
        todos &&
        <div className="container mx-auto p-4 w-full grid md:grid-cols-3 grid-cols-1 gap-4">
        {
        todos?.map((ele)=>(
            <div key={ele.id} className="p-5 border flex flex-col card">
        <p className='flex-1'> {ele?.todo} </p>
        <div className="action flex gap-3 mt-2">
            <button onClick={()=>updateTodo(ele?.id)} className='text-white bg-indigo-500 text-sm py-1 px-2'>Update</button>
            <button onClick={()=>deleteTodo(ele?.id)} className='text-white bg-red-700 text-sm py-1 px-2'>Delete</button>
        </div>
    </div>
        ))
        }
        
      </div>
      }
    </main>
  );
}
