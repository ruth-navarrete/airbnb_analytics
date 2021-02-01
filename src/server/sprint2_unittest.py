import unittest
import csv
import pandas as pd
import numpy as np

def search1(a,b):
    df = pd.read_csv("listings.csv")
    df.sort_values(by="price",inplace=True)

    df[a]=df[a].apply(str)
    #To deal with ValueError: Cannot mask with non-boolean array containing NA / NaN values

    df_test=df[df[a].str.contains(b)]
    print(df_test)

    numRow = len(df_test)
    return numRow

def search2(c,d):
    df = pd.read_csv("listings.csv")
    df.sort_values(by="price",inplace=True)
    df_test=df.loc[(df["price"]>=c)&(df["price"]<=d),:]
    print(df_test)

    numRow=len(df_test)
    return numRow


class demoTest(unittest.TestCase):
    def test_search1_neighbourhood_group(self):
        self.assertEquals(search1('neighbourhood_group','Centro'),search1('neighbourhood_group','Centro'))
    def test_search1_neighbourhood(self):
        self.assertEquals(search1('neighbourhood','Justicia'),search1('neighbourhood','Justicia'))
    def test_search1_room_type(self):
        self.assertEquals(search1('room_type','Private room'),search1('room_type','Private room'))
    def test_search1_name(self):
        self.assertEquals(search1('name','Charming Prado Luxury'),search1('name','Charming Prado Luxury'))
    def test_search1_host_name(self):
        self.assertEquals(search1('host_name','Raquel'),search1('host_name','Raquel'))
    def test_search2_price1(self):
        self.assertEquals(search2(100,500),search2(100,500))
    def test_search2_price2(self):
        self.assertEquals(search2(500,1000),search2(500,1000))

if __name__=='__main__':
    unittest.main()
