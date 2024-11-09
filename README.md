# Description
The aim of this application is to build a basic note taking app using Vite, React, Typescript and Tailwind.


# Main features

- A board with a list of Notes 
- Display a note title, last updated date and content 
- Ability to update, create and delete notes 
- Ability to create notes of different types:
  - Plain text note
  - Todo list note
  - Image note
  - WYSYWYG note
- Pin a note
- Open a note to edit it


## Note content
Due to the API provided just allows to insert a note with the following structure:
```JSON
{
  "body":"..."
}
```
We will opt for using a JSON string to store the information with the following structure:

```JSON
{
  "config":{
    "type": "image|wysywig|todo-list|plain-text",
    "pinned": true|false,
    "created_at":"1731173914", // UNIX time stamp
    "updated_at":"1731173914", // UNIX time stamp
    "deleted_at":"1731173914", // UNIX time stamp
    "labels":"['movies','AI']" // Array of string
  },
 "content":"" // expected to be different depending on the note type

}
```