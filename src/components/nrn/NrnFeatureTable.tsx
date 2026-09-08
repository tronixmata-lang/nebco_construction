import type { NrnFeatureCategory } from "@/content/nrn";

type NrnFeatureTableProps = {
  features: NrnFeatureCategory["features"];
};

export function NrnFeatureTable({ features }: NrnFeatureTableProps) {
  return (
    <div className="nrn-table-wrap">
      <table className="nrn-table">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Title</th>
            <th scope="col">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={feature.title}>
              <td className="nrn-table__sn">{String(index + 1).padStart(2, "0")}</td>
              <td className="nrn-table__title">{feature.title}</td>
              <td className="nrn-table__remarks">
                <p className="nrn-table__remarks-text">{feature.description}</p>
                <p className="nrn-table__popup">{feature.description}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
