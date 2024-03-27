interface Filter extends Omit<Row, 'id' | 'complete'> {
    complete: number | undefined;
    enabled: boolean;
}
