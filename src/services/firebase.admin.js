import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: "soul-megle",
            privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDgpuBcOa/yDWuv\nhluOAaLgtGdP9lzir0WNuExqq11jEjimPfs4RQfyc3vgKzBPQraSjckjdr8fh860\nrrl8ZfhRnTlZgy1TReiQWXGg0V/uUcoUewck0BhGBftjDtQPcZhSnpI37cAwWSr9\n0656EIw7/fLFCC5GzLlWHH0vEmfyKMwc4AXeqbUUlg8qlKDYJObyi0PcaNJDxDcL\nXZSbse4TcBSFo0NJ/wa2Rrs2nN6oKW5xzlX24MJKzApWwg7sbBHo9MS8xTbJIlI9\na0EalEFp2tot7EmV2WPR57rBnM+ZmCghxDqDNzp5uBdBucKJov15x2AVgZ2ivDZR\nSg5fnC3/AgMBAAECggEAQWLw3IcB2f7j//OoRD3frW10wIZhZK1FHkmtHEMCbGqK\nSICz1R3qgTvxqz6G0hsFzsQr7gGLAV9i354XaMi5LPAJGC+hCqLHXPRbqUYnmNL/\ncVSZsLJMzlzBXYScXl5eynVS86pkjO33IGfzWZ3lYzS363dFGOBPdWvXV9MQpB+G\nEntRMxKzdbPBaxcy33IGwXRO/3+qpMRz8hVHoLCFH93WjH5FEkYuwLjargd3sTLz\nsFgo/OQh5Dd9dVArUJv+rxJBvGXmcGVoJXHpji1UVyN+n32KRSR0ha8rYFsHHmOO\nnMLj09KKBYdwN4ZxCEFn1ZlgiPLoNiotUjyqtlMyaQKBgQD4JWoPl8wqEhx5r7Nd\nfaiCA/mVbxAm0k1grzHYPXjaNOUD6+vckcrbidLmf3pE69xf398tusFxhKNvQy4e\nTwU28agZRTW4X0qL9uakmVVeip8P+Wso6HHMyY/qaIxv5248hU22k0NvUd28c630\n/nsrkk3WWFd3WxqVwmudVXCgLQKBgQDnwxn0NG07O0gq0HScCtJrFeeALpUMLIHf\nfgqryzzFU33kwCRv2gwiYmVDmUyH0skURRbZ5cIqUazYKCFHQwymnGbenjQguDHt\nc9bF3cUBfeU3UM52Aq76rfH9eYXyPpbGlEUDDHdmLWcnnmg8vPsS97zhoHOqf+mf\nbNj64kj2WwKBgBPDxyLe0GA5eRMoL30u2REiB+sjIYI2FfuxeKLkoo+ezu71B6BV\n7HZ4D9hUJwT+VFs+laQqz+WezvW5wB6h5KRvsxfwL0s0K9fiHpTVsbsKB4laMHLd\nsNLC6zechDMVl+4yH/J+4EwplSPBgwWUj3L1AEYmWzEijIeJKNErUQExAoGBAKQK\neS1bilEZZbxALblhA4yeRWx6DC9AtXAuM3ljchEtRneJ9IBi8qHHyWsub3fXn1HE\nkScLtAHmK5QX224oLCUloL5DdhwOo/AxRLxqew3SQVKE1I282oM+aYEC6ecLnAbU\nXYCJ610cF954Bcmv7XqAdWWx/wyYWxDnpzD0x7XvAoGBAJahXVCiekTd/sjoxVhQ\np55YzITJZPf2B2Qr1yt86wNYDsQ8oK8U5u8kWg0htRZtNd4JjsH7RxonjAKzXolM\nQAm/cmkSvBtMLv49aN4AsFAvHh+jasHacnaGhbzYDXU5lL1y4dv8mOTf5yHhegXL\npK4uy/2ozOS3BTnYd7vdzqOL\n-----END PRIVATE KEY-----\n",
            clientEmail: "firebase-adminsdk-fbsvc@soul-megle.iam.gserviceaccount.com",
        }),
    });
}

export default admin;