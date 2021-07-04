import axios from 'axios'
const baseUrl = '/api/comments'

const addComment = async (id, content) => {
  const res = await axios.post(`${baseUrl}/${id}`, content)
  return res.data
}

const fetchComment = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

export default { addComment, fetchComment }
