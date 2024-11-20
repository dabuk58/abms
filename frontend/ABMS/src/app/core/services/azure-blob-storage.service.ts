import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AzureBlobStorageService {
  accountName = 'bedfindblobs';
  containerName = 'pictures';
  sas = environment.azureBlobStorageConfig.sas;

  constructor() {}

  private containerClient(): ContainerClient {
    return new BlobServiceClient(
      `https://${this.accountName}.blob.core.windows.net?${this.sas}`
    ).getContainerClient(this.containerName);
  }

  public uploadImage(content: Blob, name: string, handler: () => void) {
    this.uploadBlob(content, name, this.containerClient(), handler);
  }

  public deleteImage(name: string, handler: () => void) {
    this.deleteBlob(name, this.containerClient(), handler);
  }

  private uploadBlob(
    content: Blob,
    name: string,
    client: ContainerClient,
    handler: () => void
  ) {
    let blockBlobClient = client.getBlockBlobClient(name);
    blockBlobClient
      .uploadData(content, {
        blobHTTPHeaders: { blobContentType: content.type },
      })
      .then(() => handler());
  }

  private deleteBlob(
    name: string,
    client: ContainerClient,
    handler: () => void
  ) {
    client.deleteBlob(name).then(() => {
      handler();
    });
  }
}
