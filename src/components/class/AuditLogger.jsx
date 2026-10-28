import { Component } from "react";
import { writeStorage } from "../../utils/storage.js";

const AUDIT_KEY = "inventory-dashboard-audit-log";

class AuditLogger extends Component {
  constructor(props) {
    super(props);
    this.state = { isExpanded: true };
  }

  componentDidMount() {
    writeStorage(AUDIT_KEY, this.props.logs);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.logs !== this.props.logs) {
      writeStorage(AUDIT_KEY, this.props.logs);
    }
  }

  componentWillUnmount() {
    writeStorage(AUDIT_KEY, this.props.logs);
  }

  toggleExpanded = () => {
    this.setState((currentState) => ({ isExpanded: !currentState.isExpanded }));
  };

  render() {
    const { logs } = this.props;
    const { isExpanded } = this.state;

    return (
      <section className="audit-section">
        <div className="section-heading">
          <div>
            <h2>Recent activity</h2>
            <p>Product changes are saved in this browser.</p>
          </div>
          <button
            className="button button-secondary"
            type="button"
            onClick={this.toggleExpanded}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Hide activity" : "Show activity"}
          </button>
        </div>
        {isExpanded &&
          (logs.length > 0 ? (
            <ul className="audit-list">
              {logs.map((log) => (
                <li key={log.id}>
                  <span>
                    <strong>{log.type}</strong> {log.productName}
                  </span>
                  <time dateTime={log.timestamp}>
                    {new Date(log.timestamp).toLocaleString()}
                  </time>
                </li>
              ))}
            </ul>
          ) : (
            <p className="audit-empty">
              No product changes have been recorded yet.
            </p>
          ))}
      </section>
    );
  }
}

export default AuditLogger;
