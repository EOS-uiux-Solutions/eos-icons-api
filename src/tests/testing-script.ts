import { exec } from 'child_process'

const command = 'newman run ./src/documents/eos-icons-picker.postman_collection.json'
export const executeTestCommand = () => {
  return exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    if (stderr) {
      console.log(stderr)
      process.exit(1)
    }
    console.log(`${stdout}`)
    console.log('Version 1 APIs tests are finished')
    process.exit(0)
  })
}
