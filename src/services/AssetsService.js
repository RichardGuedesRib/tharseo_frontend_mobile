import serverConfig from "./ServerConfig";
import { useAuthStore } from "../stores/useAuthStore";
import { useAssetStore } from "../stores/useAssetStore"; 

// Function to get all generic assets from the server
export async function getAllAssetsServer() {
  const request = `${serverConfig.addressServerTharseo}/assets`;
  const { token } = useAuthStore.getState(); 
  const setAssets = useAssetStore.getState().setAssets; 

  try {
    const response = await fetch(request, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Erro ao buscar a lista de assets no servidor");
      return;
    }
    
    const data = await response.json();
    setAssets(data); 
    return data;
  } catch (error) {
    console.error("Erro na requisição de assets", error);
  }
}

// Função para obter todos os assets de um usuário específico
export async function getAllAssetsByUser(iduser) {
  const request = `${serverConfig.addressServerTharseo}/assetsuser/user?iduser=${iduser}`;
  const { token } = useAuthStore.getState();

  try {
    const response = await fetch(request, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Erro ao buscar a lista de assets do usuário");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição de assets por usuário", error);
  }
}

// Função para alternar o estado do asset na carteira do usuário
export async function toggleAssetUser(wallet, user, item) {
  const { token } = useAuthStore.getState();

  try {
    let method;
    let operation;

    const isAssetInWallet =
      user &&
      Array.isArray(wallet) &&
      wallet.some((walletItem) => walletItem.acronym === item.acronym);

    if (!isAssetInWallet) {
      method = `${serverConfig.addressServerTharseo}/assetsuser?iduser=${user}&symbol=${item.acronym}`;
      operation = "POST";
    } else {
      const idItemWallet = wallet.find((itemWallet) => itemWallet.acronym === item.acronym);
      method = `${serverConfig.addressServerTharseo}/assetsuser/${idItemWallet.id}`;
      operation = "DELETE";
    }

    const response = await fetch(method, {
      method: operation,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Erro ao ${operation === "POST" ? "adicionar" : "remover"} asset`);
      return;
    }
    
  } catch (error) {
    console.error("Erro na operação de alternância do asset", error);
  }
}
