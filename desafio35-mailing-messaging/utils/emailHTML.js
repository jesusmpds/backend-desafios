exports.emailHTML = ({ username, date, message }) => {

return `
<h1>User Information</h1>
<ul>
    <li>Date: ${date}</li>
    <li>User Email: ${username}</li>
</ul>
<p>${message}</p>
`};