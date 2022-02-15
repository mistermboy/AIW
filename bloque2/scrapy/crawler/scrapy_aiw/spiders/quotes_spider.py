from bs4 import BeautifulSoup
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class MySpider(CrawlSpider):
    name = 'uniovi'
    allowed_domains = ['www.uniovi.es']
    start_urls = ['http://www.uniovi.es']

    rules = (
        # Extract links matching 'item.php' and parse them with the spider's method parse_item
        Rule(LinkExtractor(allow=('/', )), callback='parse_item',follow=True),
    )

    def parse_item(self, response):
        self.logger.info('Hi, this is an item page! %s', response.url)
        soup = BeautifulSoup(response.body).get_text()
        self.logger.info('SOUPPPP! %s', soup)
        page = response.url.split("/")[-2]
        filename = f'quotes-{page}.html'
        with open(filename, 'w') as f:
            f.write(soup)
        self.log(f'Saved file {filename}')