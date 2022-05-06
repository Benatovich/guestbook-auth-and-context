export default function Entry({ author, content, date }) {
  return (
    <div>
        <div>
            <p>{content}</p>
        </div>
        <div>
            <p>{author}</p>
            <p>on {new Date(date).toLocaleString()}</p>
        </div>
    </div>
  )
}
