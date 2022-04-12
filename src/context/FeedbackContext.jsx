import {createContext, useState, useEffect} from 'react';
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    }) 

    useEffect(() => {
      fetchFeedback()
    }, [])
    

  //fetch feedback
  const fetchFeedback = async () => {
      const response = await fetch(
          `http://localhost:5000/feedback?_sort=id$_order=desc`
      )
      const data = await response.json()
      
      setFeedback(data)
      setIsLoading(false)
  }

  //feedback deleting
  const deleteFeedback = (id) => {
   if (window.confirm("Are you sure you want to deletet this feedback?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
}

  // adding feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback])
  };

  //edit feedback
  const updateFeedback = (id, updItem) => {
      setFeedback(
          feedback.map((item) => (item.id === id ? {...item, ...updItem} : item))
      )
  }

  //item update
  const editFeedback = (item) => {
      setFeedbackEdit ({
          item,
          edit:true,
      })
  }
    return (
    <FeedbackContext.Provider value = {{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        
    }}
    >
        {children}
    </FeedbackContext.Provider>
    )
}

export default FeedbackContext