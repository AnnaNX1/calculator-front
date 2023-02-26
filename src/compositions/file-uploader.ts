export async function uploadFiles(files, url) {
  // set up the request data
  let formData = new FormData()
  for(const file of files) {
    formData.append('multFiles', file)
  }
  // track status and upload file
  // file.status = 'loading'
  let response = await fetch(url, { method: 'POST', mode: "cors", body: formData })

  // change status to indicate the success of the upload request
  // file.status = response.ok

  return response
}

export default function createUploader(url) {
    return {
      uploadFiles: function (files) {
          console.log(files)
            return uploadFiles(files, url)
        },
    }
}
