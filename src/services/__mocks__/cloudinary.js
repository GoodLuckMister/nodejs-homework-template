module.exports = {
    v2: {
        config: () => { },
        uploader: {
            upload: (a, b, cb) => {
                cb(null, {
                    public_id: '12345',
                    secure_url: 'avatarUrl'
                })
            }
        }
    }
}