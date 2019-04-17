const conf = {
  bitbucketAppKey: process.env.BITBUCKET_API_KEY,
  apiUser: process.env.BITBUCKET_API_USER,
  apiEndpoint: process.env.BITBUCKET_API_URL,
  get auth() {
    return {
      auth: {
        username: this.apiUser,
        password: this.bitbucketAppKey
      }
    };
  }
};

module.exports = conf;
