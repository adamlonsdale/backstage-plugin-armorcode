import { DiscoveryApi, IdentityApi } from "@backstage/core-plugin-api";
import { ResponseError } from "@backstage/errors";
import { ArmorcodeApi } from "./ArmorcodeApi";

export class ArmorcodeClient implements ArmorcodeApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly identityApi: IdentityApi;

  public constructor(options: {
    discoveryApi: DiscoveryApi;
    identityApi: IdentityApi;
  }) {
    this.discoveryApi = options.discoveryApi;
    this.identityApi = options.identityApi;
  }

  public async getCriticalProductFindings(
    productId: number
  ): Promise<any> {
    const baseUrl = `${await this.discoveryApi.getBaseUrl("armorcode")}`;
    const endpointUrl = `${baseUrl}/products/${productId}/findings/critical`;
    const { token: idToken } = await this.identityApi.getCredentials();
    const response = await fetch(endpointUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
      },
    });

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return response.json();
  }

  public async getProducts(): Promise<any> {
    const baseUrl = `${await this.discoveryApi.getBaseUrl("armorcode")}`;
    const endpointUrl = `${baseUrl}/products`;
    const { token: idToken } = await this.identityApi.getCredentials();
    const response = await fetch(endpointUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
      },
    });

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return response.json();
  }
}
