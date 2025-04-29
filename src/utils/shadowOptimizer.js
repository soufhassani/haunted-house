const shadowOptimizer = (model) => {
  model.shadow.mapSize.width = 256;
  model.shadow.mapSize.height = 256;
  model.shadow.camera.far = 7;
};

export default shadowOptimizer;
