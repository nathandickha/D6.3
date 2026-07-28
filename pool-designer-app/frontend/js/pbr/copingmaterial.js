// js/pbr/copingMaterial.js
import * as THREE from "https://esm.sh/three@0.158.0";
import { poolSceneAssetManager } from "../assets/PoolSceneAssetManager.js";

let cachedMaterial = null;

export async function loadCopingMaterial(scene) {
  if (cachedMaterial) return cachedMaterial;

  const textureSettings = {
    repeatX: 2,
    repeatY: 2,
    anisotropy: 12,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    magFilter: THREE.LinearFilter
  };

  /*
   * Create a visible stone material immediately. Previously this function
   * waited for every PBR map before constructing the material, which left
   * coping geometry black during startup.
   */
  cachedMaterial = new THREE.MeshStandardMaterial({
    color: 0xc6bfb4,
    roughness: 0.72,
    metalness: 0.0,
    envMapIntensity: 1.0
  });

  cachedMaterial.userData.isCoping = true;

  const loadAndAssign = async (
    fileName,
    materialSlot,
    colorSpace = THREE.NoColorSpace
  ) => {
    try {
      const texture = await poolSceneAssetManager.getTexture(
        new URL(`../../textures/Coping/${fileName}`, import.meta.url).href,
        {
          ...textureSettings,
          colorSpace
        }
      );

      // The cached material may have been disposed during an app teardown.
      if (!cachedMaterial) return null;

      cachedMaterial[materialSlot] = texture;

      // Remove the temporary stone tint once the diffuse image is available.
      if (materialSlot === "map") {
        cachedMaterial.color.set(0xffffff);
      }

      cachedMaterial.needsUpdate = true;
      return texture;
    } catch (error) {
      console.warn(
        `[Coping] Failed to load ${fileName}; retaining fallback appearance.`,
        error
      );
      return null;
    }
  };

  // Prioritise the visible base-colour map.
  void loadAndAssign(
    "StoneEmbeddedTiles_DIFF_2K.webp",
    "map",
    THREE.SRGBColorSpace
  );

  // Add the supporting PBR maps progressively without blocking first paint.
  void Promise.all([
    loadAndAssign(
      "StoneEmbeddedTiles_NORMAL_2K.webp",
      "normalMap"
    ),
    loadAndAssign(
      "StoneEmbeddedTiles_AO_2K.webp",
      "aoMap"
    ),
    loadAndAssign(
      "StoneEmbeddedTiles_ROUGH_2K.webp",
      "roughnessMap"
    ),
    loadAndAssign(
      "StoneEmbeddedTiles_DISP_2K.webp",
      "displacementMap"
    )
  ]).then(() => {
    if (!cachedMaterial) return;

    cachedMaterial.displacementScale =
      cachedMaterial.displacementMap ? 0.005 : 0;

    cachedMaterial.roughness = 0.6;
    cachedMaterial.envMapIntensity = 1.2;
    cachedMaterial.needsUpdate = true;
  });

  // Because the material already exists, awaiting this async function resolves
  // immediately while its textures continue loading in the background.
  return cachedMaterial;
}
