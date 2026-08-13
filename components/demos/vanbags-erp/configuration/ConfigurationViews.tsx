"use client";

import { ConfigurationPanel } from "@/components/projects/ConfigurationPanel";
import { ConfigTree } from "./ConfigTree";
import { ERP_CONFIG, type ConfigViewId } from "@/data/demos/vanbags-erp";

export function ConfigurationViews({ view }: { view: ConfigViewId }) {
  switch (view) {
    case "company":
      return (
        <ConfigurationPanel
          title="Company &amp; Fiscal Setup"
          note={ERP_CONFIG.company.note}
        >
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
            <li>Company: {ERP_CONFIG.company.company}</li>
            <li>Base currency: {ERP_CONFIG.company.currency}</li>
            <li>Fiscal year: {ERP_CONFIG.company.fiscalYear}</li>
            <li>Default cost center: {ERP_CONFIG.company.defaultCostCenter}</li>
            <li>Default warehouse: {ERP_CONFIG.company.defaultWarehouse}</li>
          </ul>
        </ConfigurationPanel>
      );

    case "chart-of-accounts":
      return (
        <ConfigurationPanel title="Chart of Accounts" note={ERP_CONFIG.chartNote}>
          <ConfigTree nodes={ERP_CONFIG.chartOfAccounts} />
        </ConfigurationPanel>
      );

    case "accounting-mappings":
      return (
        <ConfigurationPanel
          title="Accounting Mappings"
          note={ERP_CONFIG.mappingsNote}
        >
          <MappingTable rows={ERP_CONFIG.accountingMappings} />
        </ConfigurationPanel>
      );

    case "cost-centers":
      return (
        <ConfigurationPanel title="Cost Centers" note={ERP_CONFIG.costCentersNote}>
          <ConfigTree nodes={ERP_CONFIG.costCenters} />
        </ConfigurationPanel>
      );

    case "warehouses":
      return (
        <ConfigurationPanel title="Warehouses" note={ERP_CONFIG.warehousesNote}>
          <ConfigTree nodes={ERP_CONFIG.warehouses} />
        </ConfigurationPanel>
      );

    case "item-groups":
      return (
        <ConfigurationPanel title="Item Groups" note={ERP_CONFIG.itemGroupsNote}>
          <ConfigTree nodes={ERP_CONFIG.itemGroups} />
        </ConfigurationPanel>
      );

    default:
      return null;
  }
}

interface MappingRow {
  source: string;
  account: string;
  dimension?: string;
}

function MappingTable({ rows }: { rows: MappingRow[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-secondary">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-foreground">
              Source object
            </th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">
              Configured account
            </th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">
              Dimension
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-popover">
          {rows.map((row) => (
            <tr key={row.source}>
              <td className="px-4 py-2 align-top text-muted-foreground">
                {row.source}
              </td>
              <td className="px-4 py-2 align-top text-muted-foreground">
                {row.account}
              </td>
              <td className="px-4 py-2 align-top text-muted-foreground">
                {row.dimension ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AccountingConsequencePreview() {
  return (
    <ConfigurationPanel
      title="Accounting Consequence Preview"
      note="Illustrative posting chain for this simulation."
    >
      <ol className="list-decimal list-outside ml-5 space-y-1 text-sm text-muted-foreground">
        {ERP_CONFIG.accountingChain.map((link) => (
          <li key={link.label}>
            <span className="font-medium text-foreground">{link.label}</span>
            {link.detail ? ` — ${link.detail}` : null}
          </li>
        ))}
      </ol>

      <div className="mt-4 space-y-3">
        {ERP_CONFIG.accountingExamples.map((example) => (
          <div
            key={example.title}
            className="rounded-md border border-border bg-secondary/40 p-3"
          >
            <h4 className="text-sm font-semibold text-foreground">
              {example.title}
            </h4>
            <ul className="mt-1 list-disc list-outside ml-5 space-y-0.5 text-xs text-muted-foreground">
              {example.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs italic text-muted-foreground">
        Illustrative accounting consequences for configuration understanding.
        This is a simulation, not an actual posting engine.
      </p>
    </ConfigurationPanel>
  );
}
