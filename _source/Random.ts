class Random {

  public static bool(chance: number = 0.5): boolean {
    return Math.random() < chance;
  }

  public static between(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  public static intBetween(min: number, max: number): number {
    return Random.between(min, max) << 0;
  }

  public static lessThan(max: number): number {
    return Random.between(0, max);
  }

  public static intLessThan(max: number): number {
    return Random.intBetween(0, max);
  }

  public static intCoord(width: number, height: number): [number, number] {
    return [Random.intLessThan(width), Random.intLessThan(height)];
  }

  public static fromArray<T>(arr: T[]): T {
    return arr[Random.intBetween(0, arr.length)];
  }

  public static weightedRandom<T>(arr: [T, number][]): T {
    const totalWeight = arr.map(x => x[1]).reduce((acc, x) => acc + x);
    const weight = Random.between(0, totalWeight);
    let totalIndex = 0;
    //index into the array
    for (let i = 0; i < arr.length; i++) {
      totalIndex += arr[i][1];
      if (totalIndex >= weight) {
        return arr[i][0];
      }
    }
    return arr[0][0];
  }

}
