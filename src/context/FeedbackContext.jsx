import {createContext, useState} from 'react';
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'from context 1',
            rating: 4,
        },
        {
            id: 2,
            text: 'from context 2',
            rating: 4,
        },
        {
            id: 3,
            text: 'from context 3',
            rating: 5,
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    }) 

  //feedback deleting
  const deleteFeedback = (id) => {
   if (window.confirm("Are you sure you want to deletet this feedback?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
}

  //feedback adding
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