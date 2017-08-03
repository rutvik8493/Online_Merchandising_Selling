#!/usr/bin/perl

# Name: Desai, Rutvik
# Class Account#: jadrn010
# Project #1

use CGI;

my $q = new CGI;
my $response = $q->param("Model");

print "Content-type: text/html\n\n";
print $response;
