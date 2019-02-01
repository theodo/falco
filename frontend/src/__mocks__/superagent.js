const request = {
  get: jest.fn(),
  post: jest.fn(),
  query: jest.fn(),
  send: jest.fn(),
  set: jest.fn(),
};

request.get.mockReturnValue(request);
request.post.mockReturnValue(request);
request.query.mockReturnValue(request);
request.send.mockReturnValue(request);
request.set.mockReturnValue(request);

export default request;
