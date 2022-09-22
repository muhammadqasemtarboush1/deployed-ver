import { useRef, useState } from 'react'
import {
    ref,
    uploadBytesResumable, listAll, getDownloadURL
} from "firebase/storage";
import { v4 } from "uuid"
import { storage } from '../firebase/firebase'

const UploadFile = ({ setLinks, links }) => {
    const inputEl = useRef(null)
    let [value, setValue] = useState(0)

    function uploadFile() {
        const storageFolderRef = ref(storage, `${v4()}/`)
        let task = ''
        // get file
        for (let i = 0; i < inputEl.current.files.length; i++) {
            console.log('i', i)
            var file = inputEl.current.files[i]
            const storageRef = ref(storage, `${storageFolderRef}/${file.name}`)
            task = uploadBytesResumable(storageRef, file)

        }
        // var file = inputEl.current.files[0]
        // create a storage ref
        // const storageRef = ref(storage, `${storageFolderRef}/${file.name}`)
        // console.log('storageRef', storageRef)
        // upload file
        // const task = uploadBytesResumable(storageRef, file)

        // update progress bar
        task.on('state_change',

            function progress(snapshot) {
                setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },

            function error(err) {
                alert(error)
            },

            function complete() {
                listAll(storageFolderRef).then((response) => {

                    response.items.map((item) => {

                        getDownloadURL(item).then((downloadURL) => {
                            setLinks(state => [...state, downloadURL])
                        }

                        )
                    })
                })
                alert('Uploaded to firebase storage successfully!')
            }
        )
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <progress value={value} max="100" style={{ width: '100%' }}></progress>
            <br />
            <input
                type="file"
                onChange={uploadFile}
                ref={inputEl}
                multiple
            />
        </div>
    )
}

export default UploadFile