export default function AnswerForm() {
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const form = new FormData(event.target);
      const formData = Object.fromEntries(form.entries());
  
      const res = await fetch('/api/answer', {
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      console.log(formData);
      const result = await res.json();
      console.log(result)
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Question</label>
        <input name="question" type="text"  />
        <label>date</label>
        <input name="date" type="text"  />
        <label>tag</label>
        <input name="tag" type="text"  />
        <label>answer</label>
        <textarea name="answer" type="text"  />
  
        <button type="submit">Create Answer to question</button>
      </form>
    );
  }