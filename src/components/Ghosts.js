import * as THREE from "three";
import shadowOptimizer from "../utils/shadowOptimizer";

const Ghosts = () => {
  const ghost1 = new THREE.PointLight("#ff00ff", 1, 2);
  ghost1.castShadow = true;
  shadowOptimizer(ghost1);
  const ghost2 = new THREE.PointLight("#ffff00", 1, 2);
  ghost2.castShadow = true;
  shadowOptimizer(ghost2);
  const ghost3 = new THREE.PointLight("#00ffff", 1, 2);
  ghost3.castShadow = true;
  shadowOptimizer(ghost3);

  return { ghost1, ghost2, ghost3 };
};

export default Ghosts;
