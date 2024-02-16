import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';

import { WorkspaceDataSourceService } from 'src/workspace/workspace-datasource/workspace-datasource.service';

// TODO: Move outside of the messaging module
@Injectable()
export class CompanyService {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
  ) {}

  public async getExistingCompaniesByDomainNames(
    domainNames: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<{ id: string; domainName: string }[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const existingCompanies =
      await this.workspaceDataSourceService.executeRawQuery(
        `SELECT id, "domainName" FROM ${dataSourceSchema}.company WHERE "domainName" = ANY($1)`,
        [domainNames],
        workspaceId,
        transactionManager,
      );

    return existingCompanies;
  }

  public async createCompany(
    id: string,
    name: string,
    domainName: string,
    city: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}.company (id, name, "domainName", address)
      VALUES ($1, $2, $3, $4)`,
      [id, name, domainName, city],
      workspaceId,
      transactionManager,
    );
  }
}
