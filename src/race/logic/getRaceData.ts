import Puppeteer from 'puppeteer';
import { getTextFromElement } from 'src/util/puppeteer';

export const getRaceData = async (url: string) => {
  const id = new URL(url).searchParams.get('race_id');
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  });

  await page.waitForSelector(
    'table.Shutuba_Table.RaceTable01.ShutubaTable.tablesorter.tablesorter-default > tbody > tr',
  );

  const horseElementList = await page.$$(
    'table.Shutuba_Table.RaceTable01.ShutubaTable.tablesorter.tablesorter-default > tbody > tr',
  );

  const horseList = await Promise.all(
    horseElementList.map(async (horseRow, i) => {
      const horseNum = i + 1;
      const horse = await getTextFromElement(horseRow, 'td.HorseInfo');
      const jockey = await getTextFromElement(horseRow, 'td.Jockey');

      return {
        horseNum,
        horse,
        jockey,
      };
    }),
  );

  const totalHorseNum = horseElementList.length;

  await browser.close();

  return {
    id,
    totalHorseNum,
    horseList,
  };
};
