ALTER TABLE work_orders
ALTER COLUMN sla_breached SET DEFAULT FALSE;

UPDATE work_orders
SET sla_breached = FALSE
WHERE sla_breached IS NULL;

ALTER TABLE work_orders
ALTER COLUMN sla_breached SET NOT NULL;